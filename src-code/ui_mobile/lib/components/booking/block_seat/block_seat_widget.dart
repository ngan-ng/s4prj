import '/components/booking/seat/seat_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'block_seat_model.dart';
export 'block_seat_model.dart';

class BlockSeatWidget extends StatefulWidget {
  const BlockSeatWidget({
    Key? key,
    required this.block,
  }) : super(key: key);

  final List<dynamic>? block;

  @override
  _BlockSeatWidgetState createState() => _BlockSeatWidgetState();
}

class _BlockSeatWidgetState extends State<BlockSeatWidget> {
  late BlockSeatModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => BlockSeatModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return Container(
      width: 145.0,
      height: 50.0,
      decoration: BoxDecoration(
        color: FlutterFlowTheme.of(context).secondaryBackground,
      ),
      child: Builder(
        builder: (context) {
          final block = widget.block!.toList();
          return Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(block.length, (blockIndex) {
              final blockItem = block[blockIndex];
              return wrapWithModel(
                model: _model.seatModels.getModel(
                  blockIndex.toString(),
                  blockIndex,
                ),
                updateCallback: () => setState(() {}),
                child: SeatWidget(
                  key: Key(
                    'Keyb18_${blockIndex.toString()}',
                  ),
                  seat: blockItem,
                ),
              );
            }).divide(SizedBox(width: 5.0)),
          );
        },
      ),
    );
  }
}
