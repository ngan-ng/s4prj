import '/components/empty_list/empty_list_widget.dart';
import '/flutter_flow/flutter_flow_animations.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:simple_gradient_text/simple_gradient_text.dart';
import 'select_flight_model.dart';
export 'select_flight_model.dart';

class SelectFlightWidget extends StatefulWidget {
  const SelectFlightWidget({
    Key? key,
    required this.outboundFlights,
    required this.inboundFlights,
    this.paxQty,
  }) : super(key: key);

  final List<dynamic>? outboundFlights;
  final List<dynamic>? inboundFlights;
  final dynamic paxQty;

  @override
  _SelectFlightWidgetState createState() => _SelectFlightWidgetState();
}

class _SelectFlightWidgetState extends State<SelectFlightWidget>
    with TickerProviderStateMixin {
  late SelectFlightModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  final animationsMap = {
    'textOnPageLoadAnimation': AnimationInfo(
      trigger: AnimationTrigger.onPageLoad,
      effects: [
        MoveEffect(
          curve: Curves.easeInOut,
          delay: 80.ms,
          duration: 600.ms,
          begin: Offset(0.0, 0.0),
          end: Offset(0.0, 0.0),
        ),
      ],
    ),
  };

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SelectFlightModel());
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(_model.unfocusNode),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(60.0),
          child: AppBar(
            backgroundColor: FlutterFlowTheme.of(context).primary,
            automaticallyImplyLeading: false,
            leading: Align(
              alignment: AlignmentDirectional(0.0, 0.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8.0),
                child: Image.asset(
                  'assets/images/logo.png',
                  width: 339.0,
                  height: 200.0,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            title: Align(
              alignment: AlignmentDirectional(-1.0, 0.0),
              child: AutoSizeText(
                'FS Airlines',
                textAlign: TextAlign.start,
                style: FlutterFlowTheme.of(context).headlineMedium.override(
                      fontFamily: 'Outfit',
                      color: FlutterFlowTheme.of(context).primaryBackground,
                      lineHeight: 2.0,
                    ),
              ).animateOnPageLoad(animationsMap['textOnPageLoadAnimation']!),
            ),
            actions: [],
            centerTitle: false,
            elevation: 3.0,
          ),
        ),
        body: SafeArea(
          top: true,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Align(
                alignment: AlignmentDirectional(-1.0, 0.0),
                child: Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(16.0, 10.0, 0.0, 5.0),
                  child: GradientText(
                    'Departure',
                    textAlign: TextAlign.start,
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          fontSize: 22.0,
                        ),
                    colors: [
                      FlutterFlowTheme.of(context).primary,
                      Color(0xD38A35DF)
                    ],
                    gradientDirection: GradientDirection.ltr,
                    gradientType: GradientType.linear,
                  ),
                ),
              ),
              Container(
                height: 230.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                  boxShadow: [
                    BoxShadow(
                      blurRadius: 4.0,
                      color: Color(0x33000000),
                      offset: Offset(0.0, 2.0),
                    )
                  ],
                ),
                child: Builder(
                  builder: (context) {
                    final outboundFlights =
                        widget.outboundFlights!.map((e) => e).toList();
                    if (outboundFlights.isEmpty) {
                      return Container(
                        width: 330.0,
                        height: 48.0,
                        child: EmptyListWidget(),
                      );
                    }
                    return ListView.separated(
                      padding: EdgeInsets.fromLTRB(
                        0,
                        10.0,
                        0,
                        0.0,
                      ),
                      shrinkWrap: true,
                      scrollDirection: Axis.vertical,
                      itemCount: outboundFlights.length,
                      separatorBuilder: (_, __) => SizedBox(height: 3.0),
                      itemBuilder: (context, outboundFlightsIndex) {
                        final outboundFlightsItem =
                            outboundFlights[outboundFlightsIndex];
                        return Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              16.0, 0.0, 16.0, 0.0),
                          child: InkWell(
                            splashColor: Colors.transparent,
                            focusColor: Colors.transparent,
                            hoverColor: Colors.transparent,
                            highlightColor: Colors.transparent,
                            onTap: () async {
                              setState(() {
                                _model.departFlight = getJsonField(
                                  outboundFlightsItem,
                                  r'''$''',
                                );
                              });
                            },
                            child: Container(
                              width: MediaQuery.sizeOf(context).width * 1.0,
                              height: 60.0,
                              decoration: BoxDecoration(
                                color: FlutterFlowTheme.of(context).alternate,
                                boxShadow: [
                                  BoxShadow(
                                    blurRadius: 4.0,
                                    color: FlutterFlowTheme.of(context).accent4,
                                    offset: Offset(0.0, 2.0),
                                  )
                                ],
                                borderRadius: BorderRadius.circular(25.0),
                                border: Border.all(
                                  color: getJsonField(
                                            outboundFlightsItem,
                                            r'''$.id''',
                                          ) ==
                                          getJsonField(
                                            _model.departFlight,
                                            r'''$.id''',
                                          )
                                      ? Color(0xD38A35DF)
                                      : FlutterFlowTheme.of(context).alternate,
                                  width: 1.0,
                                ),
                              ),
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    16.0, 0.0, 16.0, 0.0),
                                child: Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Row(
                                          mainAxisSize: MainAxisSize.max,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.end,
                                          children: [
                                            Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(4.0, 0.0, 0.0, 0.0),
                                              child: Text(
                                                '\$',
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodySmall
                                                        .override(
                                                          fontFamily: 'Outfit',
                                                          color:
                                                              Color(0xFF7C8791),
                                                          fontSize: 16.0,
                                                          fontWeight:
                                                              FontWeight.normal,
                                                        ),
                                              ),
                                            ),
                                            Text(
                                              getJsonField(
                                                outboundFlightsItem,
                                                r'''$.basePrice''',
                                              ).toString(),
                                              style: FlutterFlowTheme.of(
                                                      context)
                                                  .titleMedium
                                                  .override(
                                                    fontFamily: 'Outfit',
                                                    color: getJsonField(
                                                              outboundFlightsItem,
                                                              r'''$.id''',
                                                            ) ==
                                                            getJsonField(
                                                              _model
                                                                  .departFlight,
                                                              r'''$.id''',
                                                            )
                                                        ? Color(0xD38A35DF)
                                                        : FlutterFlowTheme.of(
                                                                context)
                                                            .primaryText,
                                                    fontSize: 20.0,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                            ),
                                            Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(0.0, 4.0, 0.0, 0.0),
                                              child: Text(
                                                ' per passenger',
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodySmall
                                                        .override(
                                                          fontFamily: 'Outfit',
                                                          color:
                                                              Color(0xFF7C8791),
                                                          fontSize: 14.0,
                                                          fontWeight:
                                                              FontWeight.normal,
                                                        ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          mainAxisSize: MainAxisSize.max,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.end,
                                          children: [
                                            Align(
                                              alignment: AlignmentDirectional(
                                                  0.0, 1.0),
                                              child: Text(
                                                ' Flight FS',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color: getJsonField(
                                                                outboundFlightsItem,
                                                                r'''$.id''',
                                                              ) ==
                                                              getJsonField(
                                                                _model
                                                                    .departFlight,
                                                                r'''$.id''',
                                                              )
                                                          ? Color(0xD38A35DF)
                                                          : FlutterFlowTheme.of(
                                                                  context)
                                                              .secondaryText,
                                                      fontSize: 16.0,
                                                    ),
                                              ),
                                            ),
                                            Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(0.0, 4.0, 0.0, 0.0),
                                              child: Text(
                                                getJsonField(
                                                  outboundFlightsItem,
                                                  r'''$.flightNumber''',
                                                ).toString(),
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .titleMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color: getJsonField(
                                                                outboundFlightsItem,
                                                                r'''$.id''',
                                                              ) ==
                                                              getJsonField(
                                                                _model
                                                                    .departFlight,
                                                                r'''$.id''',
                                                              )
                                                          ? Color(0xD38A35DF)
                                                          : FlutterFlowTheme.of(
                                                                  context)
                                                              .secondaryText,
                                                    ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    Flexible(
                                      child: Align(
                                        alignment:
                                            AlignmentDirectional(1.0, 0.0),
                                        child: Icon(
                                          Icons.airplane_ticket,
                                          color: getJsonField(
                                                    outboundFlightsItem,
                                                    r'''$.id''',
                                                  ) ==
                                                  getJsonField(
                                                    _model.departFlight,
                                                    r'''$.id''',
                                                  )
                                              ? Color(0xD38A35DF)
                                              : FlutterFlowTheme.of(context)
                                                  .alternate,
                                          size: 30.0,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
              Align(
                alignment: AlignmentDirectional(-1.0, 0.0),
                child: Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(16.0, 10.0, 0.0, 5.0),
                  child: GradientText(
                    'Return',
                    textAlign: TextAlign.start,
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          fontSize: 22.0,
                        ),
                    colors: [
                      FlutterFlowTheme.of(context).primary,
                      Color(0xD38A35DF)
                    ],
                    gradientDirection: GradientDirection.ltr,
                    gradientType: GradientType.linear,
                  ),
                ),
              ),
              Container(
                height: 230.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                  boxShadow: [
                    BoxShadow(
                      blurRadius: 4.0,
                      color: Color(0x33000000),
                      offset: Offset(0.0, 2.0),
                    )
                  ],
                ),
                child: Visibility(
                  visible: widget.inboundFlights?.length != null,
                  child: Builder(
                    builder: (context) {
                      final inboundFlights =
                          widget.inboundFlights!.map((e) => e).toList();
                      if (inboundFlights.isEmpty) {
                        return Container(
                          width: 300.0,
                          height: 300.0,
                          child: EmptyListWidget(),
                        );
                      }
                      return ListView.separated(
                        padding: EdgeInsets.fromLTRB(
                          0,
                          10.0,
                          0,
                          6.0,
                        ),
                        shrinkWrap: true,
                        scrollDirection: Axis.vertical,
                        itemCount: inboundFlights.length,
                        separatorBuilder: (_, __) => SizedBox(height: 3.0),
                        itemBuilder: (context, inboundFlightsIndex) {
                          final inboundFlightsItem =
                              inboundFlights[inboundFlightsIndex];
                          return Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(
                                16.0, 0.0, 16.0, 0.0),
                            child: InkWell(
                              splashColor: Colors.transparent,
                              focusColor: Colors.transparent,
                              hoverColor: Colors.transparent,
                              highlightColor: Colors.transparent,
                              onTap: () async {
                                setState(() {
                                  _model.returnFlight = getJsonField(
                                    inboundFlightsItem,
                                    r'''$''',
                                  );
                                });
                              },
                              child: Container(
                                width: MediaQuery.sizeOf(context).width * 1.0,
                                height: 60.0,
                                decoration: BoxDecoration(
                                  color: FlutterFlowTheme.of(context).alternate,
                                  boxShadow: [
                                    BoxShadow(
                                      blurRadius: 4.0,
                                      color:
                                          FlutterFlowTheme.of(context).accent4,
                                      offset: Offset(0.0, 2.0),
                                    )
                                  ],
                                  borderRadius: BorderRadius.circular(25.0),
                                  border: Border.all(
                                    color: getJsonField(
                                              inboundFlightsItem,
                                              r'''$.id''',
                                            ) ==
                                            getJsonField(
                                              FFAppState().returnFlight,
                                              r'''$.id''',
                                            )
                                        ? Color(0xD38A35DF)
                                        : FlutterFlowTheme.of(context)
                                            .alternate,
                                    width: 1.0,
                                  ),
                                ),
                                child: Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      16.0, 0.0, 16.0, 0.0),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            mainAxisSize: MainAxisSize.max,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.end,
                                            children: [
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        4.0, 0.0, 0.0, 0.0),
                                                child: Text(
                                                  ' \$',
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodySmall
                                                      .override(
                                                        fontFamily: 'Outfit',
                                                        color:
                                                            Color(0xFF7C8791),
                                                        fontSize: 18.0,
                                                        fontWeight:
                                                            FontWeight.normal,
                                                      ),
                                                ),
                                              ),
                                              Text(
                                                getJsonField(
                                                  inboundFlightsItem,
                                                  r'''$.basePrice''',
                                                ).toString(),
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .titleMedium
                                                    .override(
                                                      fontFamily: 'Outfit',
                                                      color: getJsonField(
                                                                inboundFlightsItem,
                                                                r'''$.id''',
                                                              ) ==
                                                              getJsonField(
                                                                _model
                                                                    .returnFlight,
                                                                r'''$.id''',
                                                              )
                                                          ? Color(0xD38A35DF)
                                                          : FlutterFlowTheme.of(
                                                                  context)
                                                              .primaryText,
                                                      fontSize: 20.0,
                                                      fontWeight:
                                                          FontWeight.w500,
                                                    ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 4.0, 0.0, 0.0),
                                                child: Text(
                                                  ' per passenger',
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodySmall
                                                      .override(
                                                        fontFamily: 'Outfit',
                                                        color:
                                                            Color(0xFF7C8791),
                                                        fontSize: 14.0,
                                                        fontWeight:
                                                            FontWeight.normal,
                                                      ),
                                                ),
                                              ),
                                            ],
                                          ),
                                          Row(
                                            mainAxisSize: MainAxisSize.max,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.end,
                                            children: [
                                              Text(
                                                ' Flight FS',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color: getJsonField(
                                                                inboundFlightsItem,
                                                                r'''$.id''',
                                                              ) ==
                                                              getJsonField(
                                                                _model
                                                                    .returnFlight,
                                                                r'''$.id''',
                                                              )
                                                          ? Color(0xD38A35DF)
                                                          : FlutterFlowTheme.of(
                                                                  context)
                                                              .secondaryText,
                                                      fontSize: 16.0,
                                                    ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        0.0, 4.0, 0.0, 0.0),
                                                child: Text(
                                                  getJsonField(
                                                    inboundFlightsItem,
                                                    r'''$.flightNumber''',
                                                  ).toString(),
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .titleMedium
                                                      .override(
                                                        fontFamily:
                                                            'Readex Pro',
                                                        color: getJsonField(
                                                                  inboundFlightsItem,
                                                                  r'''$.id''',
                                                                ) ==
                                                                getJsonField(
                                                                  _model
                                                                      .returnFlight,
                                                                  r'''$.id''',
                                                                )
                                                            ? Color(0xD38A35DF)
                                                            : FlutterFlowTheme
                                                                    .of(context)
                                                                .alternate,
                                                      ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                      Flexible(
                                        child: Align(
                                          alignment:
                                              AlignmentDirectional(1.0, 0.0),
                                          child: Icon(
                                            Icons.airplane_ticket,
                                            color: getJsonField(
                                                      inboundFlightsItem,
                                                      r'''$.id''',
                                                    ) ==
                                                    getJsonField(
                                                      _model.returnFlight,
                                                      r'''$.id''',
                                                    )
                                                ? Color(0xD38A35DF)
                                                : FlutterFlowTheme.of(context)
                                                    .alternate,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      );
                    },
                  ),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: AlignmentDirectional(-1.0, 1.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Align(
                          alignment: AlignmentDirectional(-1.0, 1.0),
                          child: Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(
                                10.0, 0.0, 0.0, 10.0),
                            child: FlutterFlowIconButton(
                              borderColor: Color(0xBD4B39EF),
                              borderRadius: 15.0,
                              borderWidth: 1.0,
                              buttonSize: 48.0,
                              fillColor: FlutterFlowTheme.of(context).alternate,
                              hoverColor: FlutterFlowTheme.of(context).primary,
                              icon: Icon(
                                Icons.arrow_back_ios,
                                color: Color(0xBD4B39EF),
                                size: 24.0,
                              ),
                              showLoadingIndicator: true,
                              onPressed: () async {
                                context.safePop();
                              },
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional(1.0, 1.0),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              0.0, 0.0, 10.0, 10.0),
                          child: FFButtonWidget(
                            onPressed: (getJsonField(
                                          _model.departFlight,
                                          r'''$''',
                                        ) ==
                                        null) ||
                                    ((widget.inboundFlights?.length != null) &&
                                        (getJsonField(
                                              _model.returnFlight,
                                              r'''$''',
                                            ) ==
                                            null))
                                ? null
                                : () async {
                                    if (getJsonField(
                                          _model.returnFlight,
                                          r'''$.id''',
                                        ) ==
                                        null) {
                                      setState(() {
                                        FFAppState().departFlight =
                                            getJsonField(
                                          _model.departFlight,
                                          r'''$''',
                                        );
                                      });
                                    } else {
                                      setState(() {
                                        FFAppState().departFlight =
                                            getJsonField(
                                          _model.departFlight,
                                          r'''$''',
                                        );
                                        FFAppState().returnFlight =
                                            getJsonField(
                                          _model.returnFlight,
                                          r'''$''',
                                        );
                                      });
                                    }

                                    context.pushNamed('Passengers');
                                  },
                            text: 'Next',
                            options: FFButtonOptions(
                              width: 110.0,
                              height: 48.0,
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  0.0, 0.0, 0.0, 0.0),
                              iconPadding: EdgeInsetsDirectional.fromSTEB(
                                  0.0, 0.0, 0.0, 0.0),
                              color: FlutterFlowTheme.of(context).primary,
                              textStyle: FlutterFlowTheme.of(context)
                                  .titleSmall
                                  .override(
                                    fontFamily: 'Readex Pro',
                                    color: Colors.white,
                                  ),
                              elevation: 3.0,
                              borderSide: BorderSide(
                                color: Colors.transparent,
                                width: 1.0,
                              ),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
