import '/components/booking/block_seat/block_seat_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'single_row_model.dart';
export 'single_row_model.dart';

class SingleRowWidget extends StatefulWidget {
  const SingleRowWidget({
    Key? key,
    required this.singleRow,
  }) : super(key: key);

  final List<dynamic>? singleRow;

  @override
  _SingleRowWidgetState createState() => _SingleRowWidgetState();
}

class _SingleRowWidgetState extends State<SingleRowWidget> {
  late SingleRowModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SingleRowModel());
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
      width: double.infinity,
      height: 39.0,
      decoration: BoxDecoration(
        color: FlutterFlowTheme.of(context).secondaryBackground,
      ),
      child: Builder(
        builder: (context) {
          final singleRow = widget.singleRow!.toList();
          return Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: List.generate(singleRow.length, (singleRowIndex) {
              final singleRowItem = singleRow[singleRowIndex];
              return wrapWithModel(
                model: _model.blockSeatModels.getModel(
                  singleRowIndex.toString(),
                  singleRowIndex,
                ),
                updateCallback: () => setState(() {}),
                child: BlockSeatWidget(
                  key: Key(
                    'Keysol_${singleRowIndex.toString()}',
                  ),
                  block: singleRowItem,
                ),
              );
            }).divide(SizedBox(width: 10.0)),
          );
        },
      ),
    );
  }
}
